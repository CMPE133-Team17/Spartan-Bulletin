function Validation(values) {
    let error = {};
    const email_pattern = /^[^\s@]+@sjsu\.edu$/; // Updated email pattern
    const password_pattern = /^.{1,}$/;

    if (values.name === '') {
        error.name = 'Name should not be empty';
    } else {
        error.name = '';
    }

    if (values.email === '') {
        error.email = 'Email should not be empty';
    } else if (!email_pattern.test(values.email)) {
        error.email = 'Invalid email format or must end with @sjsu.edu';
    } else {
        error.email = '';
    }

    if (values.password === '') {
        error.password = 'Password should not be empty';
    } else if (!password_pattern.test(values.password)) {
        error.password = 'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number.';
    } else {
        error.password = '';
    }

    return error;
}

export default Validation;