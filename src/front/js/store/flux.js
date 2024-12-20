const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token:localStorage.getItem('token') || null,
			current_user:localStorage.getItem('current_user') || null
		},
		actions: {
			register: async (user) => {
				try{
					const response = await fetch(`${process.env.BACKEND_URL}/register`, {
						method:"POST",
						headers:{
							"Content-Type":"application/json"
						},
						body:JSON.stringify(user)
					})
					return response.status
				}catch(error){
					console.log(error)
					return (error)
				}
			},
			login: async (user) => {
				try{
					const response = await fetch(`${process.env.BACKEND_URL}/login`,{
						method:"POST",
						headers:{
							"Content-Type":"application/json"
						},
						body: JSON.stringify(user)
					})

					const data = await response.json()

					if (response.ok){
						setStore({
							token:data.token,
							current_user:data.current_user
						})
						localStorage.setItem("token",data.token)
						localStorage.setItem("current_user",data.current_user)
						return(response.status)

					}else{
						return(response.status)
					}
					
				}catch(error){
					return (error)
				}
			},
			close: () => {
				setStore({
					token:null,
					current_user:null
				})
				localStorage.removeItem("token") 
				localStorage.removeItem("current_user")
		
			}
		}	
	}
};

export default getState;
