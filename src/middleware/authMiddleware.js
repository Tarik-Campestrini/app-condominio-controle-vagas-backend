import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config(); 

// Middleware de proteção de rotas
export const protect = (req, res, next) => {
  let token;

  // Verifica se o cabeçalho Authorization existe e começa com "Bearer"
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer')) {
    try {
      // 1. Extrai o token (remove "Bearer " da string)
      token = authHeader.split(' ')[1];

      // 2. Verifica se o token é válido usando o segredo
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Se válido, adiciona informações do usuário (payload decodificado) ao objeto 'req'
      //    para que as rotas subsequentes possam usar (ex: saber qual usuário fez a requisição)
      req.userId = decoded.userId; // Ou req.user = decoded; se você colocou mais infos no payload

      // 4. Permite que a requisição continue para a próxima função (o controller da rota)
      next();

    } catch (error) {
      // Se jwt.verify falhar (token inválido, expirado, etc.)
      console.error('Erro na verificação do token:', error.message);
      // Retorna erro 401 - Não Autorizado
      return res.status(401).json({ message: 'Não autorizado, token inválido ou expirado.' });
    }
  }

  // Se não encontrou o token no cabeçalho
  if (!token) {
    return res.status(401).json({ message: 'Não autorizado, nenhum token fornecido.' });
  }
};