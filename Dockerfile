FROM eclipse-temurin:25-jdk AS build
WORKDIR /app
COPY . .
RUN --mount=type=cache,id=s/fc0cf063-288c-48aa-8b3d-43fb8b2c36dd-/root/.m2,target=/root/.m2 ./mvnw -B -DskipTests clean package

FROM eclipse-temurin:25-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
