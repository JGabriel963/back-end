import { Club } from "./club";
import { Desbravador } from "./desbravador";

// Todo clube pode ter muitos desbravadores
Club.hasMany(Desbravador)
// Todo desbravador pertence a um clube
Desbravador.belongsTo(Club)

export { Club, Desbravador}