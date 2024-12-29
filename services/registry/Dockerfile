FROM eclipse-temurin:17-jdk-alpine

ENV SPRING_OUTPUT_ANSI_ENABLED=ALWAYS \
    JAVA_OPTS=""

RUN apk add --no-cache curl

WORKDIR /app

# Etapa 4: Copiar o arquivo JAR gerado pelo Spring Boot
# Certifique-se de que o JAR esteja no mesmo diretório do Dockerfile ou no caminho correto
COPY target/registry-0.0.1-SNAPSHOT.jar eureka-server.jar

# Etapa 5: Expor a porta padrão do Eureka
EXPOSE 8761

# Etapa 6: Comando para iniciar a aplicação
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar eureka-server.jar"]
