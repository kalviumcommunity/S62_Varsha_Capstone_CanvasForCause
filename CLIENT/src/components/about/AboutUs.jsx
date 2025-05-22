import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Palette, MessageCircle,Lightbulb } from 'lucide-react';
import Navbar from '../layout/Navbar';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import Footer from '../layout/Footer';

const AboutUs = () => {
  useScrollAnimation();

  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar/>
      
      {/* Hero Section - Better Centered */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-lavender via-white to-purple/5">
        <div className="container mx-auto max-w-6xl px-8 md:px-12 lg:px-16">
          <div className="text-center fade-in opacity-0 translate-y-8 transition-all duration-700">
            <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">
              About <span className="text-purple">CanvasForCause</span>
            </h1>
            <p className="text-lg md:text-xl text-charcoal/70 max-w-4xl mx-auto leading-relaxed">
              We believe art is more than creativity—it's a powerful tool for healing, connection, and self-expression. 
              CanvasForCause brings together artists, storytellers, and supporters in a digital space where every brushstroke has meaning.
            </p>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-purple/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-purple/50 rounded-full mt-2"></div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-20 px-6 bg-lavender/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fade-in opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="text-3xl md:text-4xl font-semibold text-charcoal mb-4">Our Mission</h2>
            <p className="text-lg max-w-3xl mx-auto text-charcoal/70">
              Bridging art and technology to create meaningful connections and support mental well-being
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="mission-card text-center p-8 bg-white rounded-2xl shadow-sm border border-lavender/50 fade-in opacity-0 translate-y-8 transition-all duration-700 hover:shadow-xl hover:scale-105 hover:-translate-y-2 transform cursor-pointer group">
              <div className="w-16 h-16 bg-purple/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple/20 transition-colors duration-300">
                <Heart className="w-8 h-8 text-purple group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-charcoal mb-4 group-hover:text-purple transition-colors duration-300">
                Emotional Expression
              </h3>
              <p className="text-charcoal opacity-70 group-hover:opacity-90 transition-opacity duration-300">
                Provide a safe space where individuals can express their emotions through art and share their personal stories
              </p>
            </div>
            
            <div className="mission-card text-center p-8 bg-white rounded-2xl shadow-sm border border-lavender/50 fade-in opacity-0 translate-y-8 transition-all duration-700 hover:shadow-xl hover:scale-105 hover:-translate-y-2 transform cursor-pointer group">
              <div className="w-16 h-16 bg-purple/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple/20 transition-colors duration-300">
                <Users className="w-8 h-8 text-purple group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-charcoal mb-4 group-hover:text-purple transition-colors duration-300">
                Community Connection
              </h3>
              <p className="text-charcoal opacity-70 group-hover:opacity-90 transition-opacity duration-300">
                Foster meaningful connections between artists and art lovers, building a supportive community around shared experiences
              </p>
            </div>
            
            <div className="mission-card text-center p-8 bg-white rounded-2xl shadow-sm border border-lavender/50 fade-in opacity-0 translate-y-8 transition-all duration-700 hover:shadow-xl hover:scale-105 hover:-translate-y-2 transform cursor-pointer group">
              <div className="w-16 h-16 bg-purple/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple/20 transition-colors duration-300">
                <Lightbulb className="w-8 h-8 text-purple group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-charcoal mb-4 group-hover:text-purple transition-colors duration-300">
                Mental Well-being
              </h3>
              <p className="text-charcoal opacity-70 group-hover:opacity-90 transition-opacity duration-300">
                Promote mental health awareness through the therapeutic power of art and creative self-expression
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 fade-in opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="text-3xl md:text-4xl font-semibold text-charcoal mb-4">Our Story</h2>
            <p className="text-lg text-charcoal/70">Born from the understanding that art heals and connects us all</p>
          </div>
          
          <div className="fade-in opacity-0 translate-y-8 transition-all duration-700">
            <div className="text-charcoal opacity-80 space-y-6 text-left">
              <p className="text-lg leading-relaxed">
                In a world where digital connections often feel shallow, we recognized the need for a platform that goes deeper. 
                Art has always been humanity's universal language—capable of expressing what words cannot and healing what logic cannot touch.
              </p>
              
              <p className="text-lg leading-relaxed">
                CanvasForCause was created to fill the gap between existing art platforms and mental health resources. 
                We saw that while platforms existed for sharing artwork, none truly captured the emotional stories behind each creation 
                or fostered the kind of supportive community that artists and art appreciators truly needed.
              </p>
              
              <p className="text-lg leading-relaxed">
                Our platform combines cutting-edge technology with the timeless power of artistic expression, creating a space where 
                every user can create, share, connect, and find support through the universal language of art.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 px-6 bg-gradient-to-br from-lavender/20 to-purple/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fade-in opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="text-3xl md:text-4xl font-semibold text-charcoal mb-4">What Makes Us Different</h2>
            <p className="text-lg text-charcoal/70">More than just an art platform—we're a community for healing and connection</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-lavender/30 fade-in opacity-0 translate-y-8 transition-all duration-700 hover:shadow-lg hover:scale-105 hover:-translate-y-1 transform cursor-pointer group">
              <Palette className="w-10 h-10 text-purple mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h4 className="font-semibold text-charcoal mb-2 group-hover:text-purple transition-colors duration-300">Digital Canvas</h4>
              <p className="text-sm text-charcoal opacity-70 group-hover:opacity-90 transition-opacity duration-300">
                Create digital artwork with our intuitive virtual canvas tool
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-lavender/30 fade-in opacity-0 translate-y-8 transition-all duration-700 hover:shadow-lg hover:scale-105 hover:-translate-y-1 transform cursor-pointer group">
              <Heart className="w-10 h-10 text-purple mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h4 className="font-semibold text-charcoal mb-2 group-hover:text-purple transition-colors duration-300">Story Sharing</h4>
              <p className="text-sm text-charcoal opacity-70 group-hover:opacity-90 transition-opacity duration-300">
                Share the personal stories and emotions behind your artwork
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-lavender/30 fade-in opacity-0 translate-y-8 transition-all duration-700 hover:shadow-lg hover:scale-105 hover:-translate-y-1 transform cursor-pointer group">
              <Users className="w-10 h-10 text-purple mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h4 className="font-semibold text-charcoal mb-2 group-hover:text-purple transition-colors duration-300">Community Gallery</h4>
              <p className="text-sm text-charcoal opacity-70 group-hover:opacity-90 transition-opacity duration-300">
                Explore, like, comment, and connect with fellow artists
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-lavender/30 fade-in opacity-0 translate-y-8 transition-all duration-700 hover:shadow-lg hover:scale-105 hover:-translate-y-1 transform cursor-pointer group">
              <MessageCircle className="w-10 h-10 text-purple mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h4 className="font-semibold text-charcoal mb-2 group-hover:text-purple transition-colors duration-300">Private Messaging</h4>
              <p className="text-sm text-charcoal opacity-70 group-hover:opacity-90 transition-opacity duration-300">
                Build meaningful connections through private conversations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12 fade-in opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="text-3xl md:text-4xl font-semibold text-charcoal mb-4">Our Vision</h2>
            <p className="text-lg text-charcoal/70">Creating a world where art becomes a bridge to understanding, healing, and human connection</p>
          </div>
          
          <div className="bg-gradient-to-r from-purple/10 to-lavender/50 rounded-2xl p-8 fade-in opacity-0 translate-y-8 transition-all duration-700 hover:shadow-lg transition-shadow duration-300">
            <blockquote className="text-xl italic text-charcoal mb-6">
              "We envision a future where everyone has access to a supportive artistic community, 
              where creativity becomes a pathway to mental wellness, and where every story shared through art 
              helps someone else feel less alone."
            </blockquote>
            <p className="text-charcoal opacity-70 font-medium">The CanvasForCause Team</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="pt-6 pb-20 bg-gradient-to-r from-purple to-teal text-white text-center relative overflow-hidden">
        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-xl mx-auto text-center fade-in opacity-0 translate-y-8 transition-all duration-700 flex flex-col justify-center">
            <h2 className="text-3xl font-semibold mb-4 tracking-tight">Ready to Join Our Community?</h2>
            <p className="text-base mb-6 opacity-90">
              Whether you're an experienced artist or just beginning your creative journey, 
              CanvasForCause welcomes you to express, connect, and heal through art.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/signup" 
                className="bg-white text-purple px-6 py-3 rounded-full text-sm font-medium hover:bg-lavender transition-all duration-300 hover:scale-105 transform"
                aria-label="Start creating today"
                role="button"
              >
                Start Creating Today
              </Link>
              <Link 
                to="/gallery" 
                className="bg-transparent border border-white text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-white/10 transition-all duration-300 hover:scale-105 transform"
                aria-label="Explore gallery"
                role="button"
              >
                Explore Gallery
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer/>
    </div>
  );
};

export default AboutUs;