import database from "../../../../infra/database.js";

async function status(request, response) {
  const result = await database.query("Select 1+1;");
  console.log(result);
  response
    .status(200)
    .json({ chave: "Alunos do curso.dev são pessoas acima da média" });
}

export default status;
