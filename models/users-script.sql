CREATE TABLE IF NOT EXISTS `user` (
  userId BINARY(16) DEFAULT (uuid_to_bin(uuid())) NOT NULL PRIMARY KEY,
  firstName varchar(255) NOT NULL,
  lastName varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
)
