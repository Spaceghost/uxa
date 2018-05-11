import Head from './views/head'
import Nav from './views/nav'
import Home from './views/home'
import Note from './views/note'
import Typography from './views/typography'

export tag App
	
	def render
		<self>
			<#head.masthead.lg.bar.base-bg.flat.dark>
				<.brand> "UXA"
				<.flexer>
				<a.tab route-to="/"> 'Home'
				<a.tab route-to="/typygraphy"> 'Typography'
				<a.tab route-to="/elements"> 'Elements'
				<a.tab route-to="/form"> 'Form'
				<a.tab route-to="/note"> 'Note'
			
			<Home route='/'>
			<Note route='/note'>
			<Typography route='/typygraphy'>
			# <#main>