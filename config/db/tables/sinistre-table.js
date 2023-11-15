const sinistersTable = `
  CREATE TABLE IF NOT EXISTS sinisters (
    sinister_id INT PRIMARY KEY AUTOINCREMENT NOT NULL,
    category VARCHAR(20) NOT NULL,
  )
`;

export default sinistersTable;
