/* eslint-disable @typescript-eslint/ban-types */
import cluster from 'cluster';
import * as os from 'os';
import { Injectable } from '@nestjs/common';

const numCPUs = os.cpus().length;

@Injectable()
export class AppClusterService {
    static clusterize(callback: Function): void {
        if (cluster.isPrimary && process.env.NODE_ENV === 'production') {
            console.log(`Master server started on ${process.pid}`);
            for (let i = 0; i < numCPUs; i++) {
                cluster.fork();
            }
            cluster.on('exit', (worker) => {
                console.log(`Worker ${worker.process.pid} died. Restarting`);
                cluster.fork();
            });
        } else {
            console.log(`Cluster server started on ${process.pid}`);
            callback();
        }
    }
}
