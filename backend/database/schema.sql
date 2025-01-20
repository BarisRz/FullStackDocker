-- DROP previous tables if they exist to avoid conflicts
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    pseudo VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    email_verified BOOLEAN NOT NULL DEFAULT FALSE
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE refresh_token (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    token VARCHAR(1000) NOT NULL UNIQUE,
    expiration_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
DROP TABLE IF EXISTS password_reset;
CREATE TABLE password_reset (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    token VARCHAR(255) NOT NULL UNIQUE,
    expiration_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS email_confirmation;
CREATE TABLE email_confirmation (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_pseudo VARCHAR(255) NOT NULL UNIQUE,
    token VARCHAR(255) NOT NULL UNIQUE,
    expiration_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS category;
CREATE TABLE category (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
DROP TABLE IF EXISTS task_group;
CREATE TABLE task_group (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    is_public BOOLEAN NOT NULL DEFAULT FALSE,
    creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
DROP TABLE IF EXISTS task;
CREATE TABLE task (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    status ENUM('Todo', 'In progress', 'Done') NOT NULL DEFAULT 'Todo',
    creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expiration_date DATE,
    task_group_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (task_group_id) REFERENCES task_group(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS user_comment;
CREATE TABLE user_comment (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    task_id INT NOT NULL,
    content TEXT NOT NULL,
    creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (task_id) REFERENCES task(id) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

SET GLOBAL event_scheduler = ON;
CREATE EVENT IF NOT EXISTS clean_expired_records
ON SCHEDULE EVERY 1 DAY
STARTS CURRENT_TIMESTAMP
DO
BEGIN
    -- Supprimer les tokens expirés de la table refresh_token
    DELETE FROM refresh_token
    WHERE expiration_date < NOW();

    -- Supprimer les tokens expirés de la table password_reset
    DELETE FROM password_reset
    WHERE expiration_date < NOW();

    -- Supprimer les tokens expirés de la table email_confirmation
    DELETE FROM email_confirmation
    WHERE expiration_date < NOW();
END;
