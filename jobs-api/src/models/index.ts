import { Candidate } from "./candidate";
import { Company } from "./company";
import { Job } from "./job";

// Um candidato pertence a muitas vagas/jobs - através(through) de job-candidates
Candidate.belongsToMany(Job, { through: 'job_candidates' })
// Toda compania pode ter muitas vagas - hasMany
Company.hasMany(Job)
// Toda vaga/job pertence a uma compania ou empresa
Job.belongsTo(Company)
// Um vaga pode ter muitos candidatos
Job.belongsToMany(Candidate, { through: 'job_candidates' })

export {
    Candidate,
    Company,
    Job
}