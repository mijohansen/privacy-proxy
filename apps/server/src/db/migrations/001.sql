-- auto-generated definition
create table users
(
    "piiHash"    uuid                    not null,
    "trackingId" uuid                    not null,
    "doNotTrack" boolean   default false not null,
    "created"    timestamp default now() not null
);

alter table users
    owner to dbusername;

create unique index users_piihash_uindex
    on users ("piiHash");

