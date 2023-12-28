exports.auth = (req, res, next) => {
  //req.header("Authorization".replace("Bearer ","") ----> Safe PRocess
  const token =
    req.cookies.token ||
    req.body.token ||
    req.header("Authorization".replace("Bearer ", ""));

  try {
    //extract JWT token
    //other ways to fetching token

    if (!token) {
      return res.json({
        success: false,
        message: "Token Missing",
      });
    }

    //verify the Token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRATE);
      console.log(decode);

      req.user = decode;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something Went Wrong while verifying the token",
    });
  }
};
