const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  switch(error) {
    case 'Endpoint not found!':
      return res.status(404).json({
        error: error.message
      });
    case 'User not found!':
      return res.status(404).json({
        error: `${error.message} Check the username!`
      });
    case 'Session not valid!':
      return res.status(401).json({
        error: error.message
      });
    case  'No user found!':
      return res.status(401).json({
        error: `${error.message} Please log in to post!`
      });
    case  'Only author can delete!':
      return res.status(401).json({
        error: `${error.message}`
      });
    case  'User disabled!':
      return res.status(401).json({
        error: error.message
      });
    case 'No session found!': 
      return res.status(404).json({
          error: error.message
      });
    case 'invalid signature':
      return res.status(401).json({
        error: 'Session or token not valid!'
      });
    case 'Amount of likes missing!':
      return res.status(400).json({
        error: `${error.message}`
      });
    case 'Posting a blog failed':
      return res.status(400).json({
        error: `${error.message} Title and url can´t be empty.`
      });
    case  'The year should be at least 1991 and no greater than current year!':
      return res.status(400).json({
        error: error.message
      });
    case 'You can only update your own reading list!':
      return res.status(401).json({
        error: error.message
      });
    default:
      return res.status(500).json({
        error: 'Something went wrong.'
      });
  }
}

module.exports = errorHandler;
