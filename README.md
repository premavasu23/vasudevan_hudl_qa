# Hudl.com Login Testing | Prema Vasudevan

### Test Cases Handled (thus far)
* Verify if a user will be able to log in with valid credentials via the Login button on hudl.com
* Verify if a user will be able to log in with an invalid username and/or invalid password
* Verify if, when entering any combination of invalid username and/or invalid password, the user sees the correct error message

### To Run
1) The tests rely on a `credentials.json` file in the root directory (ommitted for security). The file should be formatted as follows:
    ```
    {
        "corr_email": [VALID EMAIL ADDRESS],
        "corr_pass": [VALID PASSWORD],
        "incorr_email": [INVALID EMAIL ADDRESS],
        "incorr_pass": [INVALID PASSWORD]
    }
    
2) In your preferred terminal, navigate to the root directory
3) run `npm install` the first time you run this code. You should only need to do this once. 
4) run `npm test` to run the test cases

*Note: The test cases produce output in the console to easily see what is being tested and the expected vs actual results.*