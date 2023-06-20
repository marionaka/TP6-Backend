export function isAuth(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/");
  }
}

export function isGuest(req, res, next) {
  if (!req.session.user) {
    next();
  } else {
    res.redirect("/products");
  }
}

export function isAdmin(req, res, next) {
  if (req.session.user.email === "adminCoder@coder.com") {
    req.session.isAdmin = true;
  } else {
    req.session.isAdmin = false;
  }
  next();
}