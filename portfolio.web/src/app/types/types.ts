export enum iconType {
  mail,
  linkedIn,
  gitHub

}
export interface NavPillProps {
  text: string,
  link: string,
  icon: iconType
}