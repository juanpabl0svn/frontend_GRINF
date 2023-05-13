const Error404 = () => {
  return (
    <>
      <h1 className="title-error">ERROR 404</h1>
      <p class="zoom-area">
        <b className="title-error">Pagina no encontrada</b>
      </p>
      <section class="error-container">
        <span>
          <span>4</span>
        </span>
        <span>0</span>
        <span>
          <span>4</span>
        </span>
      </section>
      <div class="link-container">
        <a href="/" class="log-in-button button">
          Volver al inicio
        </a>
      </div>
    </>
  );
};

export default Error404;
