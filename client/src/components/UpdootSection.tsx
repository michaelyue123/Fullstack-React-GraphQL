import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import { PostSnippetFragment } from "../generated/graphql";

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  return (
    <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
      <IconButton
        icon={<ChevronUpIcon />}
        aria-label="updoot post"
        boxSize="24px"
      />
      {post.points}
      <IconButton
        icon={<ChevronDownIcon />}
        aria-label="downdoot post"
        boxSize="24px"
      />
    </Flex>
  );
};

export default UpdootSection;
