CREATE DATABASE veiculos_db;

USE veiculos_db;

CREATE TABLE veiculos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    modelo VARCHAR(100) NOT NULL,
    marca VARCHAR(100) NOT NULL,
    ano INT NOT NULL,
    cor VARCHAR(50),
    preco DECIMAL(10,2)
);

INSERT INTO veiculos (modelo, marca, ano, cor, preco) VALUES
('Civic EXL', 'Honda', 2022, 'Preto', 145000.00),
('Corolla Altis', 'Toyota', 2021, 'Branco', 139900.00),
('Onix LTZ', 'Chevrolet', 2020, 'Prata', 75000.00),
('Argo Trekking', 'Fiat', 2023, 'Vermelho', 85000.00),
('HB20 Vision', 'Hyundai', 2022, 'Azul', 78000.00),
('Ranger XLS', 'Ford', 2021, 'Cinza', 199000.00),
('Kicks SV', 'Nissan', 2020, 'Branco', 102000.00),
('T-Cross Highline', 'Volkswagen', 2023, 'Verde', 128000.00),
('Renegade Longitude', 'Jeep', 2022, 'Preto', 112500.00),
('Sandero Stepway', 'Renault', 2019, 'Laranja', 67000.00);

SELECT * FROM veiculos
