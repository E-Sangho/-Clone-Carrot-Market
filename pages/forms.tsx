import React from "react";
import { FieldErrors, useForm } from "react-hook-form";

interface LoginForm {
	username: string;
	password: string;
	email: string;
}

export default function forms() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginForm>({
		mode: "onChange",
	});
	const onValid = (data: LoginForm) => {
		console.log("im valid");
	};
	const onInvalid = (errors: FieldErrors) => {
		console.log("im invalid");
	};
	console.log(errors);
	return (
		<form onSubmit={handleSubmit(onValid, onInvalid)}>
			<input
				{...register("username", {
					required: "username is required",
					minLength: {
						message: "The username should be longer than 5 chars.",
						value: 5,
					},
				})}
				type="text"
				placeholder="Username"
			/>
			<input
				{...register("email", {
					required: "email is required",
					validate: {
						notGmail: (value) =>
							!value.includes("@gmail.com") || "gmail is not allowed",
					},
				})}
				type="email"
				placeholder="Email"
			/>
			{errors.email?.message}
			<input
				{...register("password", {
					required: "password is reqquired",
				})}
				type="password"
				placeholder="Password"
			/>
			<input type="submit" value="Create Account" required />
		</form>
	);
}
