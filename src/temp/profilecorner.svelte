<script>
	import { fly, fade } from 'svelte/transition';
import Signin from './signin.svelte';
    import Signup from './signup.svelte';
    let bool = false
    let signup = false
    let login = false
</script>
<main class="main">
<div class="profile-div">
    <div on:click="{() => bool = !bool}">
    <img src='https://pixy.org/download/301929/'class="pic" alt="profile-pic"/>
    </div>
</div>

{#if bool}
<div  transition:fly="{{ y: -20, duration: 100 }}" class="lil-box">
<p on:click="{() => login = !login}">login</p>
<p on:click="{() => signup = !signup}">sign up</p>
</div>
{/if}
{#if login}
<div class="signup" transition:fade>
    <div class="background" on:click="{()=> login = !login}"></div>
    <Signin></Signin>
</div>
{/if}
{#if signup}
<div class="signup" transition:fade>
    <div class="background" on:click="{()=> signup = !signup}"></div>
    <Signup></Signup>
</div>
{/if}
</main>
<style>
    .signup {
    display: flex;
    align-items: center;
	flex-direction: column;
	font-family: sofia-pro, sans-serif;
	text-align: center;
  }

    .background{
        background-color: rgba(0, 0, 0, 0.411);
        width: 110%;
        height: 110%;
        position: fixed;
        z-index: 0;
        top: 0;
        left: 0;
    }
    .lil-box{
    display: inline;
     background-color: black;
    position: fixed;
    top: 15%;
    right: 3.25%;
    text-align: center;
    padding: 10px;
    z-index: 10;
    }
    .lil-box p{
        padding: 10px;
        margin: 0;
        cursor: pointer;
    }
    .pic{
        
    position: fixed;
    top: 5%;
    right: 5%;
    text-align: center;
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    opacity: 0.75;
    border-radius: 50%;
    box-shadow: 2px black;
    border: 2px solid black;  
    }
.pic:hover{
    opacity: 1;
}
p:hover{
    background-color: grey;
}
p{
    background-color: black;
}
</style>