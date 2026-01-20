import PersonalInformation from "./PersonalInformation"
import ChangePassword from "./ChangePassword"
import Notifications from "./Notification"

export default function SettingsPage() {

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">


      <div className="lg:col-span-3 space-y-8">
        {/* personal information */}
        <PersonalInformation></PersonalInformation>


        {/* change password */}
        <ChangePassword></ChangePassword>

        {/* notifications */}
        <Notifications></Notifications>


      </div>
    </div>
  )
}
