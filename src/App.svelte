<script>
	import { fly } from 'svelte/transition';
	import Newpoll from './temp/newpoll.svelte';
import Poll from './temp/poll.svelte';
import Profilecorner from './temp/profilecorner.svelte';


	//Opening the new poll tab
	let PollBool = false
	function NewPoll(){
		PollBool = !PollBool
	};
	//send in vote

</script>	
<Profilecorner></Profilecorner>
<h1 id="header">The Poll Story</h1>
<button on:click={NewPoll} class="newpoll-button">New Poll</button>
{#if PollBool}
	<div transition:fly="{{ y: -20, duration: 200 }}" class="newpolldiv">
		<Newpoll></Newpoll>
	</div>
{/if}

<div class="polls">
<Poll></Poll>
</div>



<style>
	.newpolldiv{
		margin-top: -10px;
		margin-bottom:20px;
	}
	
	.newpoll-button{
		display: block;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 25px;
	}
	.newpoll-button:hover{
		cursor: pointer;
		background-color: rgb(31, 31, 31);
	}
	#header{
		text-align: center;
	}
	
	h1{
		text-shadow: 1px 1px rgb(85, 85, 85);
	}
	
	@media only screen and (max-width: 600px){
		h1{
			font-size: 50px;
			margin-top: 90px;
		}
	}	
</style>