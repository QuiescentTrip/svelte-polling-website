<script>
import { onMount } from 'svelte';

import { fade } from 'svelte/transition';
import graphql  from '../graphql.js';
import { getIP } from '../request.js';
let ip
onMount(async () => {
	ip = await getIP()	
})
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
	questionuuid
  }
}
`;
function callvote(pollid, ip, questionid){
	return`
	mutation vote {
  insert_vote(objects: {pollid: "${pollid}", ipadress: "${ip}", questionuuid: "${questionid}"}) {
    returning {
      pollid
    }
  }
}
`
}
function getprosent(jef, index){
		let prosent
		let percent = []
		let allvotes = 0
		let groupquery = answers.filter(answer => jef == answer.pollid)
		var i;
		for(i=0; i < groupquery.length; i++){
			allvotes += votes.filter(vote => groupquery[i].uuid == vote.pollid).length
		}
		for(i=0; i < groupquery.length; i++){
			percent.push(votes.filter(vote => groupquery[i].uuid == vote.pollid).length)
		}
		prosent = Math.floor(100 / allvotes * percent[index])
		return prosent
	}
	function totalvotecounter(jef){
		let percent = []
		let allvotes = 0
		let groupquery = answers.filter(answer => jef == answer.pollid)

		var i;
		for(i=0; i < groupquery.length; i++){
			allvotes += votes.filter(vote => groupquery[i].uuid == vote.pollid).length
		}
		return allvotes
	}
	//Opening polls, to vote
    function vote(pollid, questionid){
		graphql(callvote(pollid, ip, questionid))
		document.location.reload(true)
	};
	//fetches the polls
	let polls = [];
	let answers = [];
	let votes = [];
	let promise = graphql(request).then((v) => {
		polls = v.poll;
		answers = v.answer
		votes = v.vote
	});
let current = ""
</script>
{#await promise}
<img src="https://thumbs.gfycat.com/BitterEarnestBeardeddragon-small.gif" style="height: 200px; margin-top: 40px; margin-bottom: 1000%;"alt="bruh">
{:then}
{#each polls as poll, index}
<div class="poll-div" loading="lazy">
	<div class="questions" on:click="{() => current = `${index}`}" transition:fade>
	<button class="polls">{poll.question}</button>
	</div>

	<div class="{current === `${index}` ? 'voting-menu' : 'not-selected'}">

		{#each answers.filter((ans) => poll.uuid === ans.pollid) as answer, i (i)}
		{#if poll.uuid == answer.pollid}
		<div class="answer" on:click={vote(answer.uuid, poll.uuid)}>
			<div class="persentage" style="width: {getprosent(poll.uuid, i)}%"></div>
			<span>{answer.answer}</span>
			<div class="votes">
			<span>{votes.filter(vote => vote.pollid == answer.uuid).length}</span>	
			</div>
		</div>
		{/if}
		{/each}
	<p id="total"><b>Total votes: {totalvotecounter(poll.uuid)}</b></p>
	</div>
</div>
{/each}

<!--{:catch error}
	<h1>{error.message}</h1>
-->
	{/await}
<style>
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
		z-index: 0;
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
		opacity: 0.75;
		overflow-x: hidden;
		word-wrap: break-word;
	}
	.not-selected{
		width: 0;
		height: 0;
		visibility: hidden;
	}
	.answer:hover{
		opacity: 1;
		background-color: rgba(0, 0, 0, 0.2);
		border-radius: 5px;
	}
    .questions{
		z-index: 0;
		
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
	
	@media only screen and (max-width: 600px){
		.voting-menu{
			width: 80%;
			font-size: large;
		}
		.polls{
			width: 80% !important;
		}
		.questions {
			font-size: larger !important;
		}
		
	}

	.polls:hover{
		background-color: rgb(37, 37, 37);
		cursor: pointer;
	}
    .polls{
		width: 60%;
		box-shadow: 1px 1px rgb(85, 85, 85);
		overflow: hidden;
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