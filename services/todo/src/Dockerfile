#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/sdk:5.0-buster-slim AS build
WORKDIR /src
COPY *.csproj .
RUN echo "ghj"
# RUN dotnet restore
# COPY . .
# WORKDIR "/src/TodoApp.Web"
# RUN dotnet build "TodoApp.Web.csproj" -c Release -o /app/build

# FROM build AS publish
# RUN dotnet publish "TodoApp.Web.csproj" -c Release -o /app/publish

# FROM base AS final
# WORKDIR /app
# COPY --from=publish /app/publish .
# ENTRYPOINT ["dotnet", "TodoApp.Web.dll"]