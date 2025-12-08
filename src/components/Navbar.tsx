export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top w-100">
      <a className="navbar-brand" href="/">
        {" "}
        Shopping Cart App
      </a>

      <div className="ms-auto d-flex align-items-center gap-3">
        <a href="/login" className="text-dark fs-4">
          <i className="bi bi-person"></i>
        </a>

        <a href="/cart" className="text-dark fs-4 position-relative">
          <i className="bi bi-cart"></i>
        </a>
      </div>
    </nav>
  );
}
