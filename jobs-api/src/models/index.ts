import { Candidate } from "./candidate";
import { Company } from "./company";
import { Job } from "./job";

// Toda compania pode ter muitas vagas - hasMany
Company.hasMany(Job)
// Toda vaga/job pertence a uma compania ou empresa
Job.belongsTo(Company)

export {
    Candidate,
    Company,
    Job
}