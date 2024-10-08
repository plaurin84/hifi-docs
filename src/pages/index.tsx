import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styled from "@emotion/styled";
import { ChatIcon } from "@heroicons/react/outline";
import Layout from "@theme/Layout";
import React from "react";

import HomepageHeader from "../components/HomepageHeader";
import GitHubIcon from "../icons/GitHubIcon";

const OuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0rem;
  width: 100%;
`;

const BodyWrapper = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1rem;
  justify-content: center;
  margin: 0rem auto;
  max-width: 960px;
  padding: 1rem 0rem;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    padding: 2rem 1rem;
    max-width: 100%;
    margin: 0rem 1rem;
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const FlexGrowDiv = styled.div`
  flex-grow: 1;
`;

const StyledLink = styled(Link)`
  align-items: center;
  border: 1px solid var(--ifm-color-emphasis-200);
  border-radius: 1.5rem;
  color: var(--ifm-font-color-base);
  display: grid;
  flex-direction: row;
  grid-template-columns: 3rem 1fr;
  justify-content: space-between;
  gap: 1.5rem;
  max-height: 250px;
  min-width: 250px;
  padding: 1rem;

  h3 {
    margin-bottom: 0.25rem;
  }

  p {
    margin-bottom: 0rem;
  }

  &:active,
  &:hover {
    border: 1px solid var(--ifm-color-emphasis-400);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
    color: var(--ifm-font-color-base);
    text-decoration: none;
  }

  @media (max-width: 960px) {
    width: 100%;
  }
`;

const StyledGitHubIcon = styled.div`
  svg {
    fill: var(--ifm-font-color-base);
  }
`;

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout description="Technical Documentation for the Hifi Protocol" title={siteConfig.title}>
      <OuterWrapper>
        <HomepageHeader />
      </OuterWrapper>
    </Layout>
  );
}
