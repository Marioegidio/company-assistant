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

INSERT INTO tipo VALUES ('admin',null),('dipendente',null) go
INSERT INTO utente VALUES ('admin','$2b$10$tyQgSvnQv7d.3VEm3/tp0ecMJl7qDbY4MsvXmkz.u.jqPMxdHw/QC','admin','admin','admin') go

