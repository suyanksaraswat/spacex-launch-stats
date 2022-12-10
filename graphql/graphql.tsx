import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */

export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  ObjectID: any;
  timestamptz: any;
  uuid: any;
};

export type LaunchLinks = {
  __typename?: "LaunchLinks";
  article_link?: Maybe<Scalars["String"]>;
  flickr_images?: Maybe<Array<Maybe<Scalars["String"]>>>;
  mission_patch_small?: Maybe<Scalars["String"]>;
  mission_patch?: Maybe<Scalars["String"]>;
  presskit?: Maybe<Scalars["String"]>;
  reddit_campaign?: Maybe<Scalars["String"]>;
  reddit_launch?: Maybe<Scalars["String"]>;
  reddit_media?: Maybe<Scalars["String"]>;
  reddit_recovery?: Maybe<Scalars["String"]>;
  video_link?: Maybe<Scalars["String"]>;
  wikipedia?: Maybe<Scalars["String"]>;
};
export type Launch = {
  __typename?: "Launch";
  details?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
  is_tentative?: Maybe<Scalars["Boolean"]>;
  launch_date_local?: Maybe<Scalars["Date"]>;
  launch_date_unix?: Maybe<Scalars["Date"]>;
  launch_date_utc?: Maybe<Scalars["Date"]>;
  launch_site?: Maybe<LaunchSite>;
  launch_success?: Maybe<Scalars["Boolean"]>;
  launch_year?: Maybe<Scalars["String"]>;
  links?: Maybe<LaunchLinks>;
  mission_id?: Maybe<Array<Maybe<Scalars["String"]>>>;
  mission_name?: Maybe<Scalars["String"]>;
  rocket?: Maybe<LaunchRocket>;
  static_fire_date_unix?: Maybe<Scalars["Date"]>;
  static_fire_date_utc?: Maybe<Scalars["Date"]>;
  telemetry?: Maybe<LaunchTelemetry>;
  tentative_max_precision?: Maybe<Scalars["String"]>;
  upcoming?: Maybe<Scalars["Boolean"]>;
  ships?: Maybe<Array<Maybe<Ship>>>;
};

export type LaunchRocket = {
  __typename?: "LaunchRocket";
  fairings?: Maybe<LaunchRocketFairings>;
  first_stage?: Maybe<LaunchRocketFirstStage>;
  rocket_name?: Maybe<Scalars["String"]>;
  rocket_type?: Maybe<Scalars["String"]>;
  rocket?: Maybe<any>;
  second_stage?: Maybe<LaunchRocketSecondStage>;
};

export type LaunchRocketSecondStage = {
  __typename?: "LaunchRocketSecondStage";
  block?: Maybe<Scalars["Int"]>;
  payloads?: Maybe<Array<Maybe<any>>>;
};

export type LaunchSite = {
  __typename?: "LaunchSite";
  site_id?: Maybe<Scalars["String"]>;
  site_name_long?: Maybe<Scalars["String"]>;
  site_name?: Maybe<Scalars["String"]>;
};

export type LaunchTelemetry = {
  __typename?: "LaunchTelemetry";
  flight_club?: Maybe<Scalars["String"]>;
};

export type LaunchRocketFairings = {
  __typename?: "LaunchRocketFairings";
  recovered?: Maybe<Scalars["Boolean"]>;
  recovery_attempt?: Maybe<Scalars["Boolean"]>;
  reused?: Maybe<Scalars["Boolean"]>;
  ship?: Maybe<Scalars["String"]>;
};

export type LaunchRocketFirstStage = {
  __typename?: "LaunchRocketFirstStage";
  cores?: Maybe<Array<Maybe<any>>>;
};

export type Ship = {
  __typename?: "Ship";
  abs?: Maybe<Scalars["Int"]>;
  active?: Maybe<Scalars["Boolean"]>;
  attempted_landings?: Maybe<Scalars["Int"]>;
  class?: Maybe<Scalars["Int"]>;
  course_deg?: Maybe<Scalars["Int"]>;
  home_port?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
  image?: Maybe<Scalars["String"]>;
  imo?: Maybe<Scalars["Int"]>;
  missions?: Maybe<Array<Maybe<any>>>;
  mmsi?: Maybe<Scalars["Int"]>;
  model?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  position?: Maybe<any>;
  roles?: Maybe<Array<Maybe<Scalars["String"]>>>;
  speed_kn?: Maybe<Scalars["Float"]>;
  status?: Maybe<Scalars["String"]>;
  successful_landings?: Maybe<Scalars["Int"]>;
  type?: Maybe<Scalars["String"]>;
  url?: Maybe<Scalars["String"]>;
  weight_kg?: Maybe<Scalars["Int"]>;
  weight_lbs?: Maybe<Scalars["Int"]>;
  year_built?: Maybe<Scalars["Int"]>;
};

export type LaunchDetailsQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type LaunchDetailsQuery = { __typename?: "Query" } & {
  launch?: Maybe<
    { __typename?: "Launch" } & Pick<
      Launch,
      "id" | "mission_name" | "details"
    > & {
        links?: Maybe<
          { __typename?: "LaunchLinks" } & Pick<
            LaunchLinks,
            "flickr_images" | "mission_patch"
          >
        >;
      }
  >;
};

export type PastLaunchesListQueryVariables = Exact<{
  limit: Scalars["Int"];
  offset: Scalars["Int"];
}>;

export type PastLaunchesListQuery = { __typename?: "Query" } & {
  launchesPast?: Maybe<
    Array<
      Maybe<
        { __typename?: "Launch" } & Pick<
          Launch,
          "id" | "mission_name" | "launch_date_utc"
        > & {
            links?: Maybe<
              { __typename?: "LaunchLinks" } & Pick<
                LaunchLinks,
                "flickr_images" | "mission_patch_small" | "wikipedia"
              >
            >;
            rocket?: Maybe<
              { __typename?: "LaunchRocket" } & Pick<
                LaunchRocket,
                "rocket_name" | "rocket_type"
              >
            >;
            launch_site?: Maybe<
              { __typename?: "LaunchSite" } & Pick<LaunchSite, "site_name_long">
            >;
          }
      >
    >
  >;
};

export const LaunchDetailsDocument = gql`
  query launchDetails($id: ID!) {
    launch(id: $id) {
      id
      mission_name
      launch_date_local
      launch_site {
        site_name_long
      }
      links {
        article_link
        video_link
      }
      rocket {
        rocket_name
        first_stage {
          cores {
            flight
            core {
              reuse_count
              status
            }
          }
        }
        second_stage {
          payloads {
            payload_type
            payload_mass_kg
            payload_mass_lbs
          }
        }
      }
      ships {
        name
        home_port
        image
      }
    }
  }
`;
export function useLaunchDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<
    LaunchDetailsQuery,
    LaunchDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<LaunchDetailsQuery, LaunchDetailsQueryVariables>(
    LaunchDetailsDocument,
    options
  );
}

export const PastLaunchesListDocument = gql`
  query pastLaunchesList($limit: Int!, $offset: Int!) {
    launchesPast(limit: $limit, offset: $offset) {
      id
      mission_name
      launch_date_local
      launch_site {
        site_name_long
      }
      launch_success
      links {
        wikipedia
        flickr_images
        mission_patch_small
      }
      launch_date_utc

      rocket {
        rocket_name
        rocket_type
      }
      ships {
        name
        home_port
        image
      }
    }
  }
`;

export function usePastLaunchesListQuery(
  baseOptions: Apollo.QueryHookOptions<
    PastLaunchesListQuery,
    PastLaunchesListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PastLaunchesListQuery, PastLaunchesListQueryVariables>(
    PastLaunchesListDocument,
    options
  );
}
