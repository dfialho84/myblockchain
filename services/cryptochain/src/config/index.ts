import { Express } from "express";
import RegistryClient from "../infrastructure/registry-client";

class Config {
    private RegistryClient: RegistryClient | null;

    constructor() {
        this.RegistryClient = null;
    }

    init(app: Express) {
        this.RegistryClient = new RegistryClient(app);
        this.RegistryClient.start();
    }
}

export default new Config();
