const errorHandler = (err, req, res, next) => {
  // Log de l'erreur pour le développeur
  console.error(err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Erreur Serveur";

  // Erreur Mongoose : Mauvais ID (CastError)
  if (err.name === "CastError") {
    message = `Ressource non trouvée (ID invalide : ${err.value})`;
    statusCode = 404;
  }

  // Erreur Mongoose : Doublon (Duplicate Key)
  if (err.code === 11000) {
    message = "Cette valeur existe déjà (doublon)";
    statusCode = 400;
  }

  // Erreur Mongoose : Validation échouée
  if (err.name === "ValidationError") {
    // On concatène tous les messages d'erreur de validation
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
    statusCode = 400;
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    // En dev, on affiche la pile d'appels pour aider au débogage
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

module.exports = errorHandler;
