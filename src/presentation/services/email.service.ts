import nodemailer, { Transporter } from 'nodemailer';

export interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachements?: Attachement[];
}

export interface Attachement {
    filename: string;
    path: string;
}

// Si usamos un paquete de terceros en mas de un archivo,es buena opcion adaptarlo
export class EmailService {

    private transporter: Transporter;


    // Eliminamos dependencias ocultas de envs, pidiendo las propieades en el constructor
    constructor(
        public readonly mailerService: string,
        public readonly mailerEmail: string,
        public readonly mailerSecretKey: string,
        private readonly postToProvider: boolean,
    ) {
        this.transporter = nodemailer.createTransport({
            service: mailerService,
            auth: {
                user: mailerEmail,
                pass: mailerSecretKey,
            }
        });
    }


    async sendEmail(options: SendMailOptions): Promise<boolean> {

        const { to, subject, htmlBody, attachements = [] } = options;


        try {
            
            if ( this.postToProvider  ) return true;
            
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachements,
            });

            // console.log( sentInformation );

            return true;
        } catch (error) {
            return false;
        }

    }

}