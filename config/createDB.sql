use schema Assistant;

create table machineType (
    name varchar(255) not null constraint machineTypes_pk primary key nonclustered,
    requirements varchar(255) default '1 core 1 GB di RAM',
    operative_system varchar(255)
)
go
    create table tag (
        name varchar(255) not null constraint tag_pk primary key nonclustered
    )
go
    create table tagMachineType (
        machineType varchar(255) constraint tagMachineType_machineType_name_fk references machineType on update cascade,
        tag varchar(255) not null constraint tagMachineType_pk primary key nonclustered constraint tagMachineType_tag_name_fk references tag on update cascade
    )
go
    create table tipo (
        name varchar(255) not null primary key,
        descrizionr int default 10
    )
go
    create table utente (
        username varchar(255) not null primary key,
        password varchar(255),
        name varchar(255),
        lastname varchar(255),
        userType varchar(255) references tipo
    )
go
    create table virtualMachine (
        idAzure varchar(1000) not null primary key,
        name varchar(255) unique,
        username varchar(255),
        password varchar(255),
        state varchar(255),
        inUse bit,
        ipAddr varchar(255),
        utente varchar(255) constraint FK_UserMachine references utente,
        osType varchar(255),
        description varchar(255)
    )
go
    create table tagVirtualMachine (
        virtualMachine varchar(255) constraint tagVirtualMachine_virtualMachine_name_fk references virtualMachine (name),
        tag varchar(255) not null constraint tagVirtualMachine_pk primary key nonclustered constraint tagVirtualMachine_tag_name_fk references tag
    )
go

INSERT INTO Assistant.dbo.tipo (name, descrizionr) VALUES (N'admin', null);
INSERT INTO Assistant.dbo.tipo (name, descrizionr) VALUES (N'dipendente', null);

INSERT INTO Assistant.dbo.utente (username, password, name, lastname, userType) VALUES (N'admin', N'$2b$10$i/hCHlFuiJgJ5CqKOrAQzeSo/2iwhmq10.eDdaNF4YVhd/Troa7Yu', N'admin', N'admin', N'admin');
INSERT INTO Assistant.dbo.utente (username, password, name, lastname, userType) VALUES (N'mariorossi', N'$2b$10$I3j22hFRbomWGZWpyb9lMekjJ8d9KC5z0BBCJViEfATeELPeMh8JG', N'Mario', N'Rossi', N'dipendente');

INSERT INTO Assistant.dbo.tag (name) VALUES (N'adobe');
INSERT INTO Assistant.dbo.tag (name) VALUES (N'editing');
INSERT INTO Assistant.dbo.tag (name) VALUES (N'fotografia');
INSERT INTO Assistant.dbo.tag (name) VALUES (N'grafica');
INSERT INTO Assistant.dbo.tag (name) VALUES (N'java');
INSERT INTO Assistant.dbo.tag (name) VALUES (N'photo');
INSERT INTO Assistant.dbo.tag (name) VALUES (N'python');
INSERT INTO Assistant.dbo.tag (name) VALUES (N'sicurezza');
INSERT INTO Assistant.dbo.tag (name) VALUES (N'ubuntu');
INSERT INTO Assistant.dbo.tag (name) VALUES (N'video');
INSERT INTO Assistant.dbo.tag (name) VALUES (N'windows');

INSERT INTO Assistant.dbo.machineType (name, requirements, operative_system) VALUES (N'editing', N'Standard_B2s', N'windows');
INSERT INTO Assistant.dbo.machineType (name, requirements, operative_system) VALUES (N'machine_learning', N'Standard_B2s', N'ubuntu');
INSERT INTO Assistant.dbo.machineType (name, requirements, operative_system) VALUES (N'cybersecurity', N'Standard_B1s', N'ubuntu');