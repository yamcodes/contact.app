FROM eclipse-temurin:25-jdk AS build
WORKDIR /app
COPY . .
RUN --mount=type=cache,id=maven-cache,target=/root/.m2 ./mvnw -B -DskipTests clean package

FROM eclipse-temurin:25-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
