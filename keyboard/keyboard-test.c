#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <linux/input.h>
 
int main (int argc, char *argv[])
{
  struct input_event ev[16];
  int fd, rd, value, size = sizeof (struct input_event);
  char name[256] = "Unknown";
  char *device;
 
  if (argv[1] == NULL){
      printf("Please specify (on the command line) the path to the dev event interface device\n");
      printf("Try cat /proc/bus/input/devices to find it.\n");
      printf("E.g. /dev/input/event0\n");
      exit (0);
    }
 
  device = argv[1];
 
  //Open Device
  if ((fd = open (device, O_RDONLY)) == -1)
    printf ("%s is not a vaild device.\n", device);
 
  //Print Device Name
  ioctl (fd, EVIOCGNAME (sizeof (name)), name);
  printf ("Reading From : %s (%s)\n", device, name);
 
  while (1){
      if ((rd = read (fd, ev, size * 64)) < size)
      {
          printf("read() Failed?\n");      
          exit(0);
      }
      value = ev[0].value;
 
// Only read the key press event
//      if (
// value is the value the event carries. Either a relative 
// change for EV_REL, absolute new value for EV_ABS (joysticks ...)
// or 0 for EV_KEY for release
// 1 for keypress and 2 for autorepeat 
//		ev[1].value == 1 &&	
// type is for example EV_REL for relative moment,
// EV_KEY for a keypress or release.
// More types are defined in include/linux/input-event-codes.h
//		ev[1].type == 1    	// EV_KEY
//	)
//	{

    printf ("code: [%d], type: [%d], value: [%d]\n", 
		ev[1].code, 
		ev[1].type,
		ev[1].value);

//      }
  }
 
  return 0;
} 

/*
---- EVENT TYPES -----
#define EV_SYN			0x00
#define EV_KEY			0x01
#define EV_REL			0x02
#define EV_ABS			0x03
#define EV_MSC			0x04
#define EV_SW			0x05
#define EV_LED			0x11
#define EV_SND			0x12
#define EV_REP			0x14
#define EV_FF			0x15
#define EV_PWR			0x16
#define EV_FF_STATUS		0x17
#define EV_MAX			0x1f
#define EV_CNT			(EV_MAX+1)
*/
