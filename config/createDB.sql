use schema Assistant;

CREATE TABLE tipo (
    name varchar(255) not null primary key,
    descrizionr int default 10
);

CREATE TABLE utente (
    username varchar(255) not null primary key,
    password varchar(255),
    name varchar(255),
    lastname varchar(255),
    userType varchar(255) references tipo
);

CREATE TABLE virtualMachine (
    idAzure varchar(1000) not null primary key,
    name varchar(255) unique,
    username varchar(255),
    password varchar(255),
    state varchar(255),
    inUse bit,
    ipAddr varchar(255),
    utente varchar(255) constraint FK_UserMachine references utente
);