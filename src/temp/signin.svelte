<script>
  import graphql  from '../graphql.js';
    
      let username, email, password 
      let strength = 0;
    
    
      let validations = []
    
      function validatePassword(e) {
        const password = e.target.value;
    
        validations = [
            (password.length > 5), 
            (password.search(/[A-Z]/) > -1), 
            (password.search(/[0-9]/) > -1), 
            (password.search(/[$&+,:;=?@#!]/) > -1) 
        ]
    
        strength = validations.reduce((acc, cur) => acc + cur, 0)
    
      }
  
      function signUpMutation(one, two, three){
      return`
        mutation signup {
        insert_user(objects: {password: "${one}", username: "${two}", email: "${three}"}) {
        returning {
        uuid
      }
     }
  }`
  }
    </script>
    
    <main class="main">
      
    <h1>Login</h1>
      <form onsubmit="return false;">
        <div class="field">
          <input type="text" name="username" class="input" placeholder=" " bind:value="{username}"/>
          <label for="text" class="label">Username</label>
        </div>
  
        <div class="field">
          <input
            type='password'
            name="password"
            class="input"
            placeholder=" "
            bind:value="{password}"          
          on:input={validatePassword}
            class:valid={strength > 3} />
          <label for="password" class="label">Password</label>
        </div>
    
        <button type="submit" 
        class="signup-button" 
        on:click="{graphql(signUpMutation(password, username, email))}"
        >Login</button>
    
      </form>
    
    </main>
    
    <style>
      .validation{
          color: var(--text-color);
      }
      form {
          --text-color: #b3b3b3;
      }
  
    .field {
      width: 100%;
      margin: 0 auto;
      position: relative;
      border-bottom: 2px dashed var(--text-color);
      margin: 4rem auto 1rem;
      transition: 500ms;
    }
  
    .label {
      color:var(--text-color);
      font-size: 1.2rem;
    }
  
    .input {
      outline: none;
      border: none;
      overflow: hidden;
      margin: 0;
      width: 100%;
      padding: 0.25rem 0;
      background: none;
      color: white;
      font-size: 1.2em;
      font-weight: bold;
      transition: border 500ms;
    }
  
    .input:valid {
      color: yellowgreen;
    }
  
    .input:invalid {
      color: orangered;
    }
  
    /* Border animation */
  
    .field::after {
      content: "";
      position: relative;
      display: block;
      height: 4px;
      width: 100%;
      background: grey;
      transform: scaleX(0);
      transform-origin: 0%;
      opacity: 0;
      transition: all 500ms ease;
      top: 2px;
    }
  
    .field:focus-within {
      border-color: transparent;
    }
  
    .field:focus-within::after {
      transform: scaleX(1);
      opacity: 1;
    }
  
    /* Label animation */
  
    .label {
      z-index: -1;
      position: absolute;
      transform: translateY(-2rem);
      transform-origin: 0%;
      transition: transform 400ms;
    }
  
    .field:focus-within .label,
    .input:not(:placeholder-shown) + .label {
      transform: scale(0.8) translateY(-5rem);
      opacity: 1;
    }
    /* Buttons */
  
    button {
      margin-top: 2rem;
      padding: 10px 30px;
      font-weight: bold;
      border: 2px solid greenyellow;
      color: greenyellow;
      border-radius: 100px;
      background: transparent;
      transition: disabled 1000ms;
      transition: 0.25s;
    }
    button:enabled:hover{
      box-shadow: inset 200px 0 0 0 greenyellow;
      color: black;
    }
  
    button:disabled {
      border-color: var(--text-color);
      color: var(--text-color);
    }
  
  main{
    width: 50%;        
    background-color: #121212;
    opacity: 1;
    background: linear-gradient(135deg, #1c1c1c55 25%, transparent 25%) -12px 0/ 24px 24px, linear-gradient(225deg, #1c1c1c 25%, transparent 25%) -12px 0/ 24px 24px, linear-gradient(315deg, #1c1c1c55 25%, transparent 25%) 0px 0/ 24px 24px, linear-gradient(45deg, #1c1c1c 25%, #121212 25%) 0px 0/ 24px 24px;
    border-radius: 10px;
    border: 1px solid white;
    padding: 40px;
    position: fixed;
    top: 50%;
     left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 50;
    
  }
 
	@media only screen and (max-width: 600px){
		main{
			width: 90%;
		}
	} 
  </style>
  