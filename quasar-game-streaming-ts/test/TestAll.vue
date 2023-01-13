<template>
	<div></div>
</template>

<script setup lang="ts">
import { ChannelChatRoomDto } from "src/apis/api-client";

interface TestPick extends Pick<ChannelChatRoomDto, "ownerChannelUserName"> {
	myProp: string;
}

interface TestOmit extends Omit<ChannelChatRoomDto, "ownerChannelUserName"> {
	myProp: string;
}

const testPick: TestPick = {
	ownerChannelUserName: "test",
	myProp: "test",
};

const testOmit: TestOmit = {
	channelId: "id",
	myProp: "test",
};
</script>

<style scoped></style>
