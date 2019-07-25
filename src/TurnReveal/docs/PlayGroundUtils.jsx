import styled from "styled-components";
import transpose from "object-transpose";
import { Direction, Transition, oppositeTransition } from "../TurnReveal";
import React from "react";

export const Front = styled.div`
	height: 100%;
	width: 100%;
	background: #1fb6ff;
	display: flex;
	justify-content: center;
	flex-direction: column;
	text-align: center;
`;

export const Image = styled.img`
	width: 100%;
	max-width: 400px;
	height: auto;
	display: block; // Fixes small spacing on the bottom
`;

const Container = styled.div`
	display: grid;
	grid-template-areas:
		". top ."
		"left reveal right"
		". bottom .";
`;

let directions = Object.keys(Direction);
// Remove __filemeta property from docz, see https://github.com/pedronauck/docz/issues/875
directions = directions.filter(direction => direction !== "__filemeta");
const arrows = ["→", "↑", "←", "↓"];

export const ControlWrapper = ({ transition, updateReveal, children }) => (
	<Container>
		{transpose({
			direction: directions,
			place: ["center left", "end center", "center right", "start center"],
			text:
				transition === Transition.show
					? arrows
					: arrows.concat(arrows).slice(2, 6) // shift every element 2 positions counter-clockwise
		}).map(({ direction, place, text }) => (
			<button
				style={{
					gridArea: direction,
					placeSelf: place
				}}
				key={direction}
				onClick={() =>
					updateReveal(oppositeTransition(transition), Direction[direction])
				}
			>
				{text}
			</button>
		))}
		{children}
	</Container>
);
