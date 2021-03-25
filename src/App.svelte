<script>
	import { fly } from 'svelte/transition';
	import Newpoll from './temp/newpoll.svelte';
	import graphql  from './graphql.js';
	//Query to display the polls
	const request= `
	query onLoad {
  answer {
    answer
    pollid
    uuid
  }
  poll(order_by: {time: desc}) {
    question
    uuid
    time
  }
  vote {
    ipadress
    pollid
	uuid
  }
}
`;
function callvote(pollid){
	return`
	mutation vote {
  insert_vote(objects: {pollid: "${pollid}", ipadress: ""}) {
    returning {
      uuid
    }
  }
}
`
}
function getprosent(jef){
		let prosent
		let percent = []
		let allvotes = 0
		let groupquery = answers.filter(answer => jef == answer.pollid)
		console.log(groupquery)
		var i;
		for(i=0; i < groupquery.length; i++){
			allvotes += votes.filter(vote => groupquery[i].uuid == vote.pollid).length
		}
		for(i=0; i < groupquery.length; i++){
			percent += votes.filter(vote => groupquery[i].uuid == vote.pollid).length
			console.log(percent)
			prosent = Math.floor(100 / allvotes * percent[i])
		}
		console.log(prosent)
		return prosent
	}
	function totalvotecounter(jef){
		let percent = []
		let allvotes = 0
		let groupquery = answers.filter(answer => jef == answer.pollid)
		console.log(groupquery)
		var i;
		for(i=0; i < groupquery.length; i++){
			allvotes += votes.filter(vote => groupquery[i].uuid == vote.pollid).length
		}
		console.log(allvotes)
		return allvotes
	}
	//Opening polls, to vote
	let slidebool = true
	function slideDown(){
		slidebool = !slidebool
	}
	//Opening the new poll tab
	let PollBool = false
	function NewPoll(){
		PollBool = !PollBool
	};
	//send in vote
	function vote(pollid){
		console.log(graphql(callvote(pollid)))
		location.reload()
	};
	//fetches the polls
	let polls = [];
	let answers = [];
	let votes = [];
	let promise = graphql(request).then((v) => {
		polls = v.poll;
		answers = v.answer
		votes = v.vote
		console.log(polls, answers, votes);
	});

</script>	
<h1 id="header">The Poll Story</h1>

<button on:click={NewPoll} class="newpoll-button">New Poll</button>
{#if PollBool}
	<div transition:fly="{{ y: -20, duration: 200 }}" class="newpolldiv">
		<Newpoll></Newpoll>
	</div>
{/if}
{#await promise}
<img src="https://thumbs.gfycat.com/BitterEarnestBeardeddragon-small.gif" style="height: 20%; margin-top: 40px;"alt="bruh">
{:then}
{#each polls as poll}
<div class="poll-div">
	<div class="questions">
	<button class="polls" on:click={slideDown}>{poll.question}</button>
	</div>
	{#if slidebool}
	<div class="voting-menu" transition:fly="{{ y: -50, duration: 200 }}">
		{#each answers as answer}
		{#if poll.uuid == answer.pollid}
		<div class="answer" on:click={vote(answer.uuid)}>
			<div class="persentage" style="width: {getprosent(poll.uuid)}%"></div>
			<span>{answer.answer}</span>
			<div class="votes">
			<span>{votes.filter(vote => vote.pollid == answer.uuid).length}</span>	
			</div>
		</div>
		{/if}
		{/each}
	<p id="total">Total votes: {totalvotecounter(poll.uuid)}</p>
	</div>
	{/if}
</div>
{/each}
{/await}
<footer>
	<p>jef</p>
</footer>

<style>
	footer{
		margin-top: 400px;
		height: 50px;
		background: rgb(0,0,0);
		background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,212,255,0) 100%);
	}
	#total{
		text-align: right;
		margin-right: 22px;
		margin-top: 5px;
		margin-bottom: 5px;
	}
	.votes{
		text-align: right;
		margin-top: -40px;
	}
	span{
		display: inline-block;
		padding: 10px 20px;
		z-index: 1000;
	}
	.persentage{
		opacity: 0.1;
		display:block;
		animation: rainbow-bg 5s linear;
		animation-iteration-count: infinite;
		height: 100%;
		position: absolute;
		box-sizing: border-box;
		border-radius: 5px;
	}
	.answer{
		position: relative;
		text-align: left;
		margin: 2px;
		cursor: pointer;
	}
	.newpolldiv{
		margin-top: -10px;
		margin-bottom:20px;
	}
	.questions{
		z-index: 100;
		
	}
	.voting-menu{
		background-color:rgb(53, 53, 53) ;
	z-index: 0;
	margin-top: -50px;
	display: inline-block;
	width: 60%;
	color: #333;
    outline: none;
    font-family: inherit;
    font-size: inherit;
    -webkit-padding: 0.4em 0;
    padding: 0.4em;
    margin: 0 0 0.5em 0;
    box-sizing: border-box;
    border: 1px solid rgb(53, 53, 53);
    border-radius: 2px;
	
	}
	.poll-div{
		margin: 10px;
	}
	.newpoll-button{
		display: block;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 25px;
	}
	#header{
		text-align: center;
	}
	.polls{
		width: 60%;
		box-shadow: 1px 1px rgb(85, 85, 85)
	}
	h1{
		text-shadow: 1px 1px rgb(85, 85, 85);
	}
	@keyframes rainbow-bg{
		100%,0%{
			background-color: rgb(255,0,0);
		}
		8%{
			background-color: rgb(255,127,0);
		}
		16%{
			background-color: rgb(255,255,0);
		}
		25%{
			background-color: rgb(127,255,0);
		}
		33%{
			background-color: rgb(0,255,0);
		}
		41%{
			background-color: rgb(0,255,127);
		}
		50%{
			background-color: rgb(0,255,255);
		}
		58%{
			background-color: rgb(0,127,255);
		}
		66%{
			background-color: rgb(0,0,255);
		}
		75%{
			 background-color: rgb(127,0,255);
		}
		83%{
			background-color: rgb(255,0,255);
		}
		91%{
			background-color: rgb(255,0,127);
		}
}
</style>