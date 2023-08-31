module.exports = {
	apps: [
		{
			name: "ifc-service",
			script: "npm",
			args: "run start",
			time: true,
			exec_mode: "fork", // need explicitly declare mode otherwise it will fallback to cluster mode and cause infinite reload
			instances: 1,
			autorestart: true,
			watch: true,
			max_memory_restart: "1G",
			ignore_watch: ["uploads"],
			env: {
				NODE_ENV: "development",
			},
			env_production: {
				NODE_ENV: "production",
			},
		},
	],
};
