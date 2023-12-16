import React from "react"
import { Button } from "../ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useCookies } from "react-cookie"
import { trpc } from "../../trpc"

export function LoginDialog() {
	const [email, setEmail] = React.useState("")
	const [password, setPassword] = React.useState("")
	const [_, setCookie, __] = useCookies(["microservichess-user-jwt"])
	const login = trpc.user.loginUser.useMutation()

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Log In</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Log In</DialogTitle>
					<DialogDescription>
						Welcome Back!
						Please enter your signup email and password below.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="email" className="text-right">
							Email
						</Label>
						<Input
							id="email"
							type="email"
							className="col-span-3"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="password" className="text-right">
							Password
						</Label>
						<Input
							id="password"
							type="password"
							className="col-span-3"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
				</div>
				<DialogFooter>
					<Button type="submit" onClick={async () => {
						console.log(email)
						console.log(password)
						const jwt = await login.mutateAsync({ email, password })
						console.log(jwt)
						setCookie("microservichess-user-jwt", jwt)
					}}>Log In</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

