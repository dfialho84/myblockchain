import { Express, Request, Response } from "express";
import { Eureka } from "eureka-js-client";
import os from "os";

const statusEndpoint = (req: Request, res: Response) => {
    res.json({ status: "UP" });
};

export default class RegistryClient {
    constructor(app: Express) {
        app.get("/status", statusEndpoint);
    }

    start() {
        const hostname = process.env.HOSTNAME || os.hostname();
        const port = process.env.PORT || 3000;
        const eurekaServers = (
            process.env.EUREKA_SERVERS || "http://localhost:8761/eureka/"
        ).split(",");

        const eurekaClient = new Eureka({
            instance: {
                app: "Cryptochain", // Nome do serviço
                hostName: hostname || "localhost", // Hostname usado no Eureka
                ipAddr: "0.0.0.0", // Endereço IP do serviço
                statusPageUrl: `http://${hostname}:${port}/status`, // Endpoint de status
                port: {
                    $: 3000, // Porta do serviço
                    "@enabled": true,
                },
                vipAddress: "CRYPTOCHAIN-SERVICE",
                dataCenterInfo: {
                    "@class":
                        "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
                    name: "MyOwn",
                },
            },
            eureka: {
                // URL do servidor Eureka (ou dos peers em alta disponibilidade)
                serviceUrls: {
                    default: eurekaServers,
                },
                fetchRegistry: true, // Permite descobrir outros serviços
                registerWithEureka: true, // Registra o serviço no Eureka
                maxRetries: 30, // Número máximo de tentativas de conexão
            },
            logger: console,
        });

        eurekaClient.start((error: any) => {
            if (error) {
                console.error("Erro ao registrar no Eureka:", error);
            } else {
                console.log("Registrado no Eureka com sucesso!");
            }
        });
    }
}
