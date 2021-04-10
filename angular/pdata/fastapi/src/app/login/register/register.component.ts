import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, EmailValidator } from '@angular/forms';
import { IUser } from '@app/_interfaces/IUser';
import { UserService } from '@app/_services/user.service'



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private userService: UserService,

  ) { }


  // ---- Variables ------
  user: IUser
  userEditForm = new FormGroup({
    id: new FormControl(''),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    password2: new FormControl('', Validators.required),
    created_at: new FormControl('', Validators.required),
    modified_at: new FormControl('', Validators.required),
  })



  ngOnInit(): void {
  }


  saveUser() {

  }
  updateUser() {

  }

  deleteUser() {

  }
  clearForm() {
    this.userEditForm.reset()
    this.user = {} as IUser
  }

}


/*




{
    "id": "88c28604-9962-11eb-b7d0-0242ac190005",
    "username": "quasar",
    "password": "$2b$12$VBqxgZRuoNGgo0bipT8YQ.b1YeUXQOeeD5zdomxO0aBzESF5Sm9.2",
    "first_name": "Jonathon",
    "last_name": "Clark",
    "status": "1",
    "email": "jc@vgoran.com",
    "created_at": "2021-04-09 11:36:44.522694",
    "modified_at": "2021-04-09 11:36:44.522694"
  }
]

})
export class StaffViewComponent implements OnInit, OnChanges {
  @Input() schoolyear:number;
  @Input() selectedStaff:IStaff;


  staff:IStaff
  user: IUser;
  leaveCalcList = [ "Teacher","Admin"]
  todate = new Date().toISOString().slice(0,10)
  // Filter for staff list
  filter = "all=True"
  constructor(
    private staffService : StaffService,
  ) { }


refresh() {
 }

 ngOnInit(): void {
  if(this.selectedStaff) {
    this.selectStaff(this.selectedStaff)
  }
}

selectStaff(staff:IStaff) {
  this.staff = staff;
  this.staffService.getUser(staff.user)
    .subscribe(
      data => {
        this.user = data
        this.staff2form()
      }
    )
}
ngOnChanges(changes:SimpleChanges) {
  this.refresh()

}

  staffEditForm = new FormGroup ({
    id: new FormControl(''),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    fullname: new FormControl('', Validators.required),
    email : new FormControl('', Validators.required),
    started: new FormControl(this.todate),
    classify: new FormControl('', Validators.required),
    is_superuser: new FormControl(''),
    is_staff: new FormControl(''),
    is_active : new FormControl(''),
    lock : new FormControl(''),
    user : new FormControl(''),
    })


staff2form() {
  this.staffEditForm.patchValue({
    id:this.staff.id,
    last_name:this.staff.last_name,
    first_name:this.staff.first_name,
    fullname:this.staff.fullname,
    email:this.staff.email,
    lock:this.staff.lock,
    started:this.staff.started,
    classify:this.staff.classify,
    user:this.user.id,
    is_active:this.user.is_active,
    is_staff:this.user.is_staff,
    is_superuser:this.user.is_superuser

  })

}
onSubmit() {

}

form2staff() {
  const s = this.staffEditForm.value
  this.staff = {} as IStaff
  this.user = {} as IUser

  this.staff.fullname = s.fullname
  this.staff.first_name = s.first_name
  this.staff.last_name = s.last_name
  this.staff.email = s.email
  this.staff.lock = s.lock
  this.staff.classify = s.classify

  this.user.username = s.email
  this.user.email = s.email
  this.user.last_name  = s.last_name
  this.user.first_name  = s.first_name
  this.user.is_active = s.is_active
  this.user.is_staff = s.is_staff
  this.user.is_superuser = s.is_superuser
  this.user.is_active = s.is_active


  if(s.id) {
  this.staff.id = s.id
  }

  if(s.started) {
    this.staff.started = s.started
  }

  if(s.user) {
    this.user.id = s.user
    this.staff.user = s.user

  }

  console.log("Form",this.staffEditForm.value)
}


saveStaff() {
  this.form2staff()
  this.staffService.createUser(this.user)
    .subscribe( data=> {
      this.staffService.createStaff(this.staff)
        .subscribe( data2 => {
          this.clearForm()
        })
      })
    }


updateStaff() {
  this.form2staff()
  console.log(this.user)
  this.staffService.updateUser(this.user)
    .subscribe( data=> {
      this.staffService.updateStaff(this.staff)
        .subscribe( data2 => {
          this.selectStaff(this.staff)
        })
      })
    }


deleteStaff() {
  this.staffService.deleteUser(this.user)
    .subscribe( data=> {
      this.staffService.deleteStaff(this.staff)
        .subscribe( data2 => {
          this.clearForm()
        })
      })
    }



clearForm() {
    this.staffEditForm.reset()
    this.staff = {} as IStaff
}
//---------------------------------


}

*/