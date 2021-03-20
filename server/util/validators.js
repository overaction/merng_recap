module.exports.validateRegisterInput = (
    username,
    email,
    password,
    confirmPassword
) => {
    const errors = {};
    if (email.trim() === "") errors.email = "이메일은 빈 칸이 될 수 없습니다";
    else {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regex.test(email))
            errors.email = "이메일 형식이 올바르지 않습니다";
    }
    if (username.trim() === "")
        errors.username = "유저네임은 빈 칸이 될 수 없습니다";
    if (password.trim() === "") errors.password = "비밀번호를 입력해주세요";
    else if (password !== confirmPassword)
        errors.confirmPassword = "비밀번호가 일치하지 않습니다";

    return {
        errors: errors,
        valid: Object.keys(errors).length < 1,
    };
};

module.exports.validateLoginInput = (email, password) => {
    const errors = {};
    if (email.trim() === "") errors.email = "이메일은 빈 칸이 될 수 없습니다";
    else {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regex.test(email))
            errors.email = "이메일 형식이 올바르지 않습니다";
    }
    if (password.trim() === "") errors.password = "비밀번호를 입력해주세요";

    return {
        errors: errors,
        valid: Object.keys(errors).length < 1,
    };
};
