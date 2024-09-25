import { promises as fsPromises } from 'fs';
import { format } from 'date-fns';
import fs from 'fs';
import path from 'path';
import { Request, Response, NextFunction } from 'express';

class EventLogger {
    private logDir: string;

    constructor(logDir?: string) {
        this.logDir = logDir || path.join(__dirname, '..', '..', 'logs');
        this.ensureLogDirExists();
    }

    private async ensureLogDirExists(): Promise<void> {
        try {
            if (!fs.existsSync(this.logDir)) {
                await fsPromises.mkdir(this.logDir);
            }
        } catch (err) {
            console.error(`Failed to create log directory: ${(err as Error).message}`);
        }
    }

    private async logEvents(message: string, logFileName: string): Promise<void> {
        const dateTime = format(new Date(), 'dd-MM-yyyy\tHH:mm:ss');
        const logItem = `${dateTime}\t${message}\n`;
        const logFilePath = path.join(this.logDir, logFileName);

        try {
            await fsPromises.appendFile(logFilePath, logItem);
        } catch (err) {
            console.error(`Failed to write to log file (${logFileName}): ${(err as Error).message}`);
        }
    }

    public logRequest(req: Request, res: Response, next: NextFunction): void {
        const startTime = process.hrtime(); // request start time

        this.logEvents(`${req.method}\t${req.headers.origin || '-'}\t${req.url}\t${req.ip}`, 'reqLog.txt');

        res.on('finish', () => {
            const [seconds, nanoseconds] = process.hrtime(startTime); // calculate response time
            const durationMs = (seconds * 1e3 + nanoseconds * 1e-6).toFixed(3);

            const logMessage = `${req.method}\t${req.headers.origin || '-'}\t${req.url}\t${req.ip}\t${res.statusCode} ${res.statusMessage}\t${durationMs}ms`;

            if (res.statusCode >= 400) {
                this.logEvents(logMessage, 'errLog.txt');
            } else {
                this.logEvents(logMessage, 'reqLog.txt');
            }
        });

        next();
    }

    public logBadRequest(req: Request, res: Response, next: NextFunction): void {
        res.status(400).json({ message: 'Bad Request' });
    }

    public logUnauthorized(req: Request, res: Response, next: NextFunction): void {
        res.status(401).json({ message: 'Unauthorized' });
    }

    public logForbidden(req: Request, res: Response, next: NextFunction): void {
        res.status(403).json({ message: 'Forbidden' });
    }

    public logNotFound(req: Request, res: Response, next: NextFunction): void {
        res.status(404).json({ message: 'Resource not found' });
    }

    public logServerError(err: Error, req: Request, res: Response, next: NextFunction): void {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export default EventLogger;
