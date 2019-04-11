pipeline{
    agent any
    triggers{
		pollSCM('* * * * *')
	}
    stages{
	stage("Docker build")	{
            steps	{
	    sh "docker build -t rostowich/protect_queen_client ."
	}
        }
	stage("Docker push to the registry")	{
	    steps	{
	    sh	"docker	push rostowich/protect_queen_client"
	}
	}
    }
}
