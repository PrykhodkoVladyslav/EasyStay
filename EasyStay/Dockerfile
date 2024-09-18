# https://hub.docker.com/_/microsoft-dotnet
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# copy csproj and restore as distinct layers
WORKDIR /src
COPY Booking.sln ./

COPY Booking/*.csproj ./Booking/
COPY Model/*.csproj ./Model/

COPY Booking.Domain/*.csproj ./Booking.Domain/
COPY Booking.Application/*.csproj ./Booking.Application/
COPY Booking.Persistence/*.csproj ./Booking.Persistence/
COPY Booking.WebApi/*.csproj ./Booking.WebApi/
RUN dotnet restore

# copy everything else and build app
COPY . .

WORKDIR /src/Booking.WebApi
RUN dotnet publish "Booking.WebApi.csproj" -c Release -o /app

# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app .

# information
EXPOSE 8080

# environments
ENV ASPNETCORE_ENVIRONMENT=Docker

# run
ENTRYPOINT ["dotnet", "Booking.WebApi.dll"]